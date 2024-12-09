<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\MenuItem;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index()
    {
        $success = request('success');

        // Get the authenticated user
        $authUser = Auth::user();

        // Check the user's role and fetch orders accordingly
        $orders = $authUser->role === 'customer'
            ? Order::with('user:id,name')->where('user_id', $authUser->id)->get()
            : Order::with('user:id,name')->get();

        return Inertia::render('Orders/Index', [
            'authUser' => [
                'role' => $authUser->role,
            ],
            'orders' => $orders,
            'success' => $success, // Pass success message to the Inertia view
        ]);
    }


    public function create()
    {
        return Inertia::render('Orders/Create', [
            'authUser' => [
                'id' => Auth::id(),
                'role' => Auth::user()->role,
            ],
            'users' => User::all(), // Assuming you want all users for the admin role
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the main order and nested orders
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'status' => 'required|string',
            'total_price' => 'required|numeric|min:0',
            'orders' => 'required|array',
            'orders.*.menu_id' => 'required|exists:menu_items,id',
            'orders.*.quantity' => 'required|integer|min:1',
            'orders.*.price' => 'required|numeric|min:0',
        ]);

        // Create the main order
        $order = Order::create([
            'user_id' => $validated['user_id'],
            'status' => $validated['status'],
            'total_price' => $validated['total_price'],
        ]);

        // Create associated order items
        foreach ($validated['orders'] as $orderItemData) {
            OrderItem::create([
                'order_id' => $order->id,
                'menu_item_id' => $orderItemData['menu_id'],
                'quantity' => $orderItemData['quantity'],
                'price' => $orderItemData['price'],
            ]);
        }

        return redirect()->route('orders.index', ['success' => 'Order created successfully.']);
    }



    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $authUser = Auth::user();
        $orderQuery = Order::with(['user', 'orderItems.menuItem']);

        if ($authUser->role === 'customer') {
            $orderQuery->where('user_id', $authUser->id);
        }

        $order = $orderQuery->findOrFail($id);

        return Inertia::render('Orders/Show', [
            'order' => $order // Wrap in an array
        ]);
    }




    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $order = Order::with(['user', 'orderItems.menuItem'])->findOrFail($id);
        $menuItems = MenuItem::all(); // Fetch all available menu items

        return Inertia::render('Orders/Update', [
            'order' => $order,
            'menuItems' => $menuItems,
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'status' => 'required|string',
            'total_price' => 'required|numeric|min:0',
            'order_items' => 'array',
            'order_items.*.id' => 'nullable|exists:order_items,id', // Nullable for new items
            'order_items.*.menu_item_id' => 'required|exists:menu_items,id',
            'order_items.*.quantity' => 'required|integer|min:1',
            'order_items.*.price' => 'required|numeric|min:0',
        ]);

        $order = Order::findOrFail($id);
        $order->update($request->only(['user_id', 'status', 'total_price']));

        foreach ($request->order_items as $itemData) {
            if (isset($itemData['id'])) {
                // Update existing order item
                $orderItem = OrderItem::find($itemData['id']);
                $orderItem->update($itemData);
            } else {
                // Add new order item
                $order->orderItems()->create($itemData);
            }
        }

        return redirect()->route('orders.show', $order->id)->with('success', 'Order updated successfully.');
    }




    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $order = Order::findOrFail($id);
        $order->delete();

        return redirect()->route('orders.index')->with('success', 'Order deleted successfully.');
    }
}

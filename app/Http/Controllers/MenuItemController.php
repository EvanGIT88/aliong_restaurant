<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MenuItem;
use Inertia\Inertia;

class MenuItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $success = request('success');
        $menuItems = MenuItem::all();
        return Inertia::render('MenuItem/Index', [
            'menuItems' => $menuItems,
            'Success' => $success, // Pass success message to the Inertia view
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('MenuItem/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => [
                'required',
                'regex:/^\d+(\.\d{1,3})?$/',
                'numeric',
                'min:0',
            ],
            'available_stock' => 'required|integer|min:0',
        ]);


        MenuItem::create($request->all());

        return redirect()->route('menu-items.index', ['success' => 'Menu item created successfully.']);
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $menuItem = MenuItem::findOrFail($id);
        return Inertia::render('MenuItem/Show', compact('menuItem'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $menuItem = MenuItem::findOrFail($id);
        return Inertia::render('MenuItem/Update', compact('menuItem'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {

        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'available_stock' => 'required|integer|min:0',
        ]);

        $menuItem = MenuItem::findOrFail($id);
        $menuItem->update($request->all());

        return redirect()->route('menu-items.index', ['success' => 'Menu item updated successfully.']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $menuItem = MenuItem::findOrFail($id);
        $menuItem->delete();

        return redirect()->route('menu-items.index', ['success' => 'Menu item deleted successfully.']);
    }
}

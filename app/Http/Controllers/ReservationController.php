<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reservation;
use App\Models\User;
use Inertia\Inertia;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $success = request('success');
        $reservations = Reservation::with('user')->get(); // Eager load the related user
        return Inertia::render('Reservations/Index', [
            'reservations' => $reservations,
            'Success' => $success, // Pass success message to the Inertia view
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $users = User::all(); // Fetch users for dropdown selection
        return Inertia::render('Reservations/Create', compact('users'));
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'reservation_date' => 'required|date|after_or_equal:today',
            'reservation_time' => 'required|date_format:H:i',
            'number_of_guests' => 'required|integer|min:1',
        ]);

        Reservation::create($request->all());

        return redirect()->route('reservations.index', ['success' => 'Reservation created successfully.']);
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $reservation = Reservation::with('user')->findOrFail($id); // Eager load the related user
        $reservation->reservation_time = date('h:i A', strtotime($reservation->reservation_time));
        return Inertia::render('Reservations/Show', compact('reservation'));
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $reservation = Reservation::findOrFail($id);
        $users = User::all();
        return Inertia::render('Reservations/Update', compact('reservation', 'users'));
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'reservation_date' => 'required|date|after_or_equal:today',
            'reservation_time' => 'required|date_format:H:i',
            'number_of_guests' => 'required|integer|min:1',
        ]);

        $reservation = Reservation::findOrFail($id);
        $reservation->update($request->all());

        return redirect()->route('reservations.index', ['success' => 'Reservation updated successfully.']);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $reservation = Reservation::findOrFail($id);
        $reservation->delete();

        return redirect()->route('reservations.index', ['success' => 'Reservation deleted successfully.']);
    }
}

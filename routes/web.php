<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\MenuItemController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderItemController;
use App\Http\Controllers\PickMenuController;
use App\Http\Controllers\ReservationController;
use App\Http\Middleware\CheckUserRole;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () {
    Route::resource('menu-items', MenuItemController::class);
    Route::resource('orders', OrderController::class)->only(['edit', 'update', 'destroy'])->middleware('role:admin');
    Route::resource('orders', OrderController::class)->only(['index', 'create', 'store', 'show']);
    Route::get('menu/pick', [PickMenuController::class, 'pick'])->name('menu.pick');
    Route::resource('order-items', OrderItemController::class);
    Route::resource('reservations', ReservationController::class);
});

require __DIR__ . '/auth.php';

<?php

namespace App\Http\Controllers;

use App\Models\MenuItem;
use Inertia\Inertia;

class PickMenuController extends Controller
{
    public function pick()
    {
        $menuItems = MenuItem::all();
        return Inertia::render('Menu', ["menuItems" => $menuItems]);
    }
}

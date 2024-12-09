<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'reservations';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'reservation_date',
        'reservation_time',
        'number_of_guests',
    ];

    /**
     * The user that owns the reservation.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookAppointment extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'time_id', 'first_name', 'last_name', 'phone_number', 'email', 'service_data', 'date', 'time', 'address', 'message', 'description', 'book_status'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function time()
    {
        return $this->belongsTo(WorkHour::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkHour extends Model
{
    use HasFactory;

     protected $fillable = ['start_time', 'end_time'];

    public function book()
    {
        return $this->hasMany(BookAppointment::class);
    }
}
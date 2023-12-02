<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\LatestAppointmentResource;
use App\Http\Resources\LatestScheduleResource;
use App\Models\BookAppointment;

class DashboardController extends Controller
{
    public function staffDashboard()
    {
        // Total Number of Appointments
        $totalAppoinments = BookAppointment::query()
        //     ->where('book_status', '!=', 'cancel')
            ->count();

        // Latest Survey
        $latestAppointment = BookAppointment::query()
            ->join('users', 'book_appointments.user_id', '=', 'users.id')
            ->join('work_hours', 'book_appointments.time_id', '=', 'work_hours.id')
            ->select(
                'book_appointments.*',
                'work_hours.start_time',
                'work_hours.end_time'
            )
            ->latest('book_appointments.created_at') // Order by created_at in descending order
            ->first();

        // Total Number of answers
        $totalClients = BookAppointment::query()
            ->select('book_appointments.user_id') // Select the user_id for distinct count
            ->distinct() // Consider only distinct user_id values
            ->count();

        // Latest 5 answer
        $latestSchedules = BookAppointment::query()
            ->join('work_hours', 'book_appointments.time_id', '=', 'work_hours.id')
            ->whereDate('book_appointments.date', now()->toDateString()) // Use whereDate for comparing dates
            ->orderBy('work_hours.start_time', 'ASC') // Use the correct column name
            ->limit(5)
            ->getModels(
                'book_appointments.*',
                'work_hours.start_time',
                'work_hours.end_time'
            );

        return response([
            'totalClients' => $totalClients,
            'latestSchedules' => LatestScheduleResource::collection($latestSchedules),
            'totalAppointments' => $totalAppoinments,
            'latestAppointments' => $latestAppointment ? new LatestAppointmentResource($latestAppointment) : null
        ]);
    }
}

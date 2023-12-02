<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BookAppointment;
use App\Http\Resources\BookAppointmentResource;
use App\Http\Resources\ScheduleResource;

class StaffController extends Controller
{
    public function bookList()
    {
        return response([
            'data' => BookAppointmentResource::collection($this->appointmentList())
        ]);
    }

    public function schedList()
    {
        $schedList = $this->scheduleList();

        foreach ($schedList as &$data) {
            if ($data['book_status'] == 'done') {
                $data['background_color'] = 'green';
            } else if ($data['book_status'] == 'cancel') {
                $data['background_color'] = 'red';
            } else {
                    $data['background_color'] = '';
            }
        }

        return response([
            'sched_data' => ScheduleResource::collection($schedList)
        ]);
    }

    public function updateStatus(Request $request, string $id)
    {
        $validatedData = $request->validate([
            'book_status' => 'required|string'
        ]);

        $resource = BookAppointment::findOrFail($request->id);

        $resource->update($validatedData);

        $schedList = $this->scheduleList();

        foreach ($schedList as &$data) {
            if ($data['book_status'] == 'done') {
                $data['background_color'] = 'green';
            } else if ($data['book_status'] == 'cancel') {
                $data['background_color'] = 'red';
            } else {
                    $data['background_color'] = '';
            }
        }

        return response([
            'data' => BookAppointmentResource::collection($this->appointmentList()),
            'sched_data' => ScheduleResource::collection($schedList)
        ]);
    }

    public function updateSchedule(Request $request, string $id)
    {
        $validatedData = $request->validate([
            'book_status' => 'required|string'
        ]);

        $resource = BookAppointment::findOrFail($request->id);

        $resource->update($validatedData);

        $schedList = $this->scheduleList();

        foreach ($schedList as &$data) {
            if ($data['book_status'] == 'done') {
                $data['background_color'] = 'green';
            } else if ($data['book_status'] == 'cancel') {
                $data['background_color'] = 'red';
            } else {
                    $data['background_color'] = '';
            }
        }

        return response([
            'data' => BookAppointmentResource::collection($this->appointmentList()),
            'sched_data' => ScheduleResource::collection($schedList)
        ]);
    }

    private function appointmentList() {
        $book = BookAppointment::query()
            ->join('users', 'book_appointments.user_id', '=', 'users.id')
            ->join('work_hours', 'book_appointments.time_id', '=', 'work_hours.id')
            ->orderBy('created_at', 'DESC')
            ->get([
                'book_appointments.*',
                'users.image_url',
                'work_hours.start_time',
                'work_hours.end_time',
            ]);
        return $book;
    }
    private function scheduleList() {
        $book = BookAppointment::query()
            ->join('users', 'book_appointments.user_id', '=', 'users.id')
            ->join('work_hours', 'book_appointments.time_id', '=', 'work_hours.id')
            ->where(function($query) {
                $query->where('book_appointments.book_status', 'accept')
                      ->orWhere('book_appointments.book_status', 'done')
                      ->orWhere('book_appointments.book_status', 'cancel');
            })
            ->get([
                'book_appointments.*',
                'users.image_url',
                'work_hours.start_time',
                'work_hours.end_time',
            ]);
        return $book;
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\BookAppointment;
use App\Http\Requests\StoreBookAppointmentRequest;
use App\Http\Requests\UpdateBookAppointmentRequest;
use App\Http\Resources\BookAppointmentResource;
use Illuminate\Http\Request;


class BookAppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        return response([
            'data' => BookAppointmentResource::collection($this->allBook($user->id))
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBookAppointmentRequest $request)
    {
        $data = $request->validated();
        $serviceData = ''; // Initialize the variable

        foreach ($data['service_data'] as $count => $service) {
            $serviceData .= $service;
            
            if ($count < count($data['service_data']) - 2) {
                $serviceData .= ', ';
            } else if ($count == count($data['service_data']) - 2) {
                $serviceData .= ', and ';
            }
        }

        // Now $serviceData should contain the desired string

        $data['description'] = $serviceData;
        $data['service_data'] = json_encode($data['service_data']);
        
        $book = BookAppointment::create($data);

        return response([
            'data' => BookAppointmentResource::collection($this->allBook($book->user_id))
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(BookAppointment $bookAppointment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBookAppointmentRequest $request, BookAppointment $bookAppointment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BookAppointment $bookAppointment)
    {
        //
    }

    private function allBook($id) {
        $book = BookAppointment::query()
            ->join('users', 'book_appointments.user_id', '=', 'users.id')
            ->join('work_hours', 'book_appointments.time_id', '=', 'work_hours.id')
            ->where('book_appointments.user_id', $id)
            ->get([
                'book_appointments.*',
                'users.email',
                'work_hours.start_time',
                'work_hours.end_time',
            ]);
        return $book;
    }
}

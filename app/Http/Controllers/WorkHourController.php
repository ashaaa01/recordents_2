<?php

namespace App\Http\Controllers;

use App\Models\WorkHour;
use Illuminate\Http\Request;
use App\Http\Resources\WorkHourResource;


class WorkHourController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $services = WorkHour::all();

        return response([
            'data' => WorkHourResource::collection($services)
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(WorkHour $workHour)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, WorkHour $workHour)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(WorkHour $workHour)
    {
        //
    }
}

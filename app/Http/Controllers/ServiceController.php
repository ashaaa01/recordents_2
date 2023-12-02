<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Http\Requests\StoreServiceRequest;
use App\Http\Requests\UpdateServiceRequest;
use App\Http\Resources\ServiceResource;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $services = Service::all();

        return response([
            'data' => ServiceResource::collection($services)
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreServiceRequest $request)
    {
        $data = $request->validated();

        $saveData = [];

        foreach ($data['services'] as $service) {
            $serviceData = $this->createService($service);
            $optionsData = [];

            foreach ($service['data']['options'] as $option) {
                $optionsData[] = $this->createServiceOption($option);
            }

            if (is_array($optionsData)) {
                $optionsData = json_encode($optionsData);
            }

            $serviceData['data'] = '{"options": '.$optionsData.'}';
            $saveData[] = $serviceData;
        }

        Service::insert($saveData);

        $services = Service::all();

        return response([
            'message' => 'The service was successfully added.',
            'data' => ServiceResource::collection($services)
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $resource = Service::find($id);

        if (!$resource) {
            return response()->json(['message' => 'Service not found'], 404);
        }

        return response([
            'status' => 'Updated',
            'current' => new ServiceResource($resource)
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateServiceRequest $request, Service $servicemodel)
    {
        $data = $request->validated();

        $saveData = [];

        foreach ($data['services'] as $service) {
            $serviceData = $this->createService($service);
            $serviceData['id'] = $service['id'];
            $optionsData = [];

            foreach ($service['data']['options'] as $option) {
                $optionsData[] = $this->createServiceOption($option);
            }

            if (is_array($optionsData)) {
                $optionsData = json_encode($optionsData);
            }

            $serviceData['data'] = '{"options": '.$optionsData.'}';
            $saveData[] = $serviceData;
        }

        // $servicemodel = User::findOrFail($saveData[0]->id);
        $updatedData = [];

        foreach ($saveData as $item) {
            $id = $item['id'];

            // Assuming you have an Eloquent model (e.g., DataModel) that corresponds to the data
            $model = Service::find($id);

            if ($model) {
                $model->update($item);
                $updatedData[] = $model;
            }
        }

        $services = Service::all();

        return response([
            'message' => 'The service was successfully updated.',
            'data' => ServiceResource::collection($services)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Service $service)
    {
        //
    }

    /**
     * Create a question and return
     *
     * @param $data
     * @return mixed
     * @throws \Illuminate\Validation\ValidationException
     * @author Jobet Guarte <jobetguartejg@gmail.com>
     */
    private function createService($data)
    {
        if (is_array($data['data'])) {
            $data['data'] = json_encode($data['data']);
        }
        $validator = Validator::make($data, [
            'title' => 'required|string',
            'type' => ['required', 'string', Rule::in([
                Service::TYPE_TEXT,
                Service::TYPE_TEXTAREA,
                Service::TYPE_SELECT,
                Service::TYPE_RADIO,
                Service::TYPE_CHECKBOX,
            ])],
            'description' => 'nullable|string',
            'data' => 'present'
        ]);

        return $validator->validated();
    }

    private function createServiceOption($data){
        $validator = Validator::make($data, [
            'uuid' => 'required|string',
            'text' => 'required|string'
        ]);

        return $validator->validated();
    }

}

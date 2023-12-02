<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Http\Requests\StoreRoleRequest;
use App\Http\Requests\UpdateRoleRequest;
use App\Http\Resources\RoleResource;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;


class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roles = Role::all();

        return response([
            'data' => RoleResource::collection($roles)
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRoleRequest $request)
    {
        $data = $request->validated();

        $saveData = [];

        foreach ($data['services'] as $service) {
            $serviceData = $this->createRole($service);

            $optionsData = json_encode($service['permission']);
            $serviceData['menu_data'] = json_encode($service['permission_data']);
            $serviceData['permission'] = $optionsData;
            $saveData[] = $serviceData;
        }

        Role::insert($saveData);

        $services = Role::all();

        return response([
            'message' => 'The role was successfully added.',
            'data' => RoleResource::collection($services)
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $exceptThisUserIds = [1,2,3];
        $resource = Role::whereNotIn('id', $exceptThisUserIds)->find($id);

        if (!$resource) {
            return response()->json(['message' => 'Role not found'], 404);
        }

        return response([
            'status' => 'Updated',
            'current' => new RoleResource($resource)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRoleRequest $request, Role $rolemodel)
    {
        $data = $request->validated();

        $saveData = [];

        foreach ($data['services'] as $service) {
            $serviceData = $this->createRole($service);
            $serviceData['id'] = $service['id'];
            
            $serviceData['permission'] = json_encode($service['permission']);
            $serviceData['menu_data'] = json_encode($service['permission_data']);
            $saveData[] = $serviceData;
        }

        // $servicemodel = User::findOrFail($saveData[0]->id);
        $updatedData = [];

        foreach ($saveData as $item) {
            $id = $item['id'];

            // Assuming you have an Eloquent model (e.g., DataModel) that corresponds to the data
            $model = Role::find($id);

            if ($model) {
                $model->update($item);
                $updatedData[] = $model;
            }
        }

        $services = Role::all();

        return response([
            'message' => 'The service was successfully updated.',
            'data' => RoleResource::collection($services)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
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
    private function createRole($data)
    {
        if (is_array($data['permission'])) {
            $data['permission'] = json_encode($data['permission']);
        }
        $validator = Validator::make($data, [
            'role' => 'required|string',
            'role_type' => 'required|string',
            'description' => 'nullable|string',
            'permission' => 'present'
        ]);

        return $validator->validated();
    }
}

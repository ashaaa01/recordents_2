<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Nette\Utils\DateTime;

class RoleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request)
    {
        return [
            'id' => $this->id,
            'role' => $this->role,
            'role_type' => $this->role_type,
            'permission' => json_decode($this->permission),
            'menu_data' => json_decode($this->menu_data),
            'created_at' => (new DateTime($this->created_at))->format('Y-m-d')
        ];
    }
}

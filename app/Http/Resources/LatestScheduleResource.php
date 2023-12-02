<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Nette\Utils\DateTime;

class LatestScheduleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'sched_time' => (new DateTime($this->start_time))->format('g:i A').' - '.(new DateTime($this->end_time))->format('g:i A'),
            'full_name' => $this->first_name.' '.$this->last_name,
            'email' => $this->email,
            'phone_number' => $this->phone_number,
            'address' => $this->address,
            'description' => $this->description,
            'book_status' => $this->book_status,
            'date' => (new DateTime($this->date))->format('Y-m-d'),
            'created_at' => (new DateTime($this->created_at))->format('Y-m-d') 
        ];
    }
}

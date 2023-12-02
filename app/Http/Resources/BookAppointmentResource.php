<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Nette\Utils\DateTime;
use Illuminate\Support\Facades\URL;

class BookAppointmentResource extends JsonResource
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
            'user_id' => $this->user_id,
            'time_id' => $this->time_id,
            'sched_time' => (new DateTime($this->start_time))->format('g:i A').' - '.(new DateTime($this->end_time))->format('g:i A'),
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'full_name' => $this->first_name.' '.$this->last_name,
            'email' => $this->email,
            'phone_number' => $this->phone_number,
            'address' => $this->address,
            'service_data' => json_decode($this->service_data),
            'description' => $this->description,
            'message' => $this->message,
            'image_url' => $this->image_url ? URL::to($this->image_url) : URL::to("images/avatars/default-avatar.png"),
            'book_status' => $this->book_status,
            'date' => (new DateTime($this->date))->format('Y-m-d'),
            'created_at' => (new DateTime($this->created_at))->format('Y-m-d') 
        ];
    }
}

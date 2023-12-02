<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('book_appointments', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(\App\Models\User::class, 'user_id');  
            $table->string('first_name', 100);
            $table->string('last_name', 100);
            $table->string('phone_number', 11);
            $table->string('email');
            $table->string('address');
            $table->longText('service_data')->default('[]');
            $table->date('date');
            $table->time('time');
            $table->longText('description')->nullable();
            $table->longText('message')->nullable();
            $table->enum('book_status', ['pending', 'viewed', 'scheduled', 'rescheduled', 'done', 'cancelled'])->default('pending');

            $table->timestamp('created_at')->default(now());
            $table->timestamp('updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('book_appointments');
    }
};

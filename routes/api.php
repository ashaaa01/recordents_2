<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\BookAppointmentController;
use App\Http\Controllers\WorkHourController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\DashboardController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    // Route::get('/auth-user', function (Request $request) {
    //     return $request->user();
    // });
    Route::get('/auth-user', [UserController::class, 'authUser']); 
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/register', [AuthController::class, 'register']);

    Route::post('/send-sms', [NotificationController::class, 'sendSmsNotificaition']);

    Route::resource('/role', RoleController::class); 

    Route::put('/lock/{id}', [UserController::class, 'lockUser']); 
    Route::put('/profile/{id}', [UserController::class, 'profile']); 
    Route::put('/change-password/{id}', [UserController::class, 'changePassword']); 
    Route::resource('/user', UserController::class); 

    Route::resource('/service', ServiceController::class); 

    // Patient
    Route::resource('/book', BookAppointmentController::class); 

    Route::resource('/time', WorkHourController::class); 

    // Staff
    Route::get('/book-appointment', [StaffController::class, 'bookList' ]); 
    Route::get('/schedule', [StaffController::class, 'schedList' ]); 
    Route::put('/book-status/{id}', [StaffController::class, 'updateStatus' ]); 
    Route::put('/schedule-status/{id}', [StaffController::class, 'updateSchedule' ]); 
    Route::get('/staff-dashboard', [DashboardController::class, 'staffDashboard']);

    // Export
    Route::get('/export-reports', [App\Http\Controllers\ExportController::class, 'downloadCSV' ]); 
});

    Route::post('/login', [AuthController::class, 'login']);

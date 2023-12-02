<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use DB;

class WorkHoursTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        DB::table('work_hours')->insert([
            'start_time' => '07:00:00',
            'end_time' => '08:00:00',
        ]);
        DB::table('work_hours')->insert([
            'start_time' => '08:00:00',
            'end_time' => '09:00:00',
        ]);
        DB::table('work_hours')->insert([
            'start_time' => '09:00:00',
            'end_time' => '10:00:00',
        ]);
        DB::table('work_hours')->insert([
            'start_time' => '11:00:00',
            'end_time' => '12:00:00',
        ]);
        DB::table('work_hours')->insert([
            'start_time' => '13:00:00',
            'end_time' => '14:00:00',
        ]);
        DB::table('work_hours')->insert([
            'start_time' => '14:00:00',
            'end_time' => '15:00:00',
        ]);
        DB::table('work_hours')->insert([
            'start_time' => '15:00:00',
            'end_time' => '16:00:00',
        ]);
        DB::table('work_hours')->insert([
            'start_time' => '16:00:00',
            'end_time' => '17:00:00',
        ]);
    }
}

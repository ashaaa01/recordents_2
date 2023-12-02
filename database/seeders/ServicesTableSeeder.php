<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use DB;

class ServicesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        DB::table('services')->insert([
            'type' => 'checkbox',
            'title' => '',
            'description' => '',
            'data' => '{"options": []}',
        ]);
    }
}

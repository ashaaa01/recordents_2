<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use  DB;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('roles')->insert([
            'role' => 'Admin',
            'description' => 'super role'
        ]);
       
        DB::table('roles')->insert([
            'role' => 'Patient',
            'description' => 'can add, and view'
        ]);
         DB::table('roles')->insert([
            'role' => 'Staff',
            'description' => 'can add, edit, and view'
        ]);
    }
}

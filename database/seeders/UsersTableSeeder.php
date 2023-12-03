<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use DB;
class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'role_id' => '1',
            'first_name' => 'Leonah',
            'last_name' => 'Polopot',
            'email' => 'leonah@gmail.com',
            'address' => 'Del Pilar, Pinamalayan, Oriental Mindoro',
            'phone_number' => '09959379125',
            'password' => bcrypt('User123#'),
            'image_url' => ''
        ]);
        DB::table('users')->insert([
            'role_id' => '3',
            'first_name' => 'Jemar',
            'last_name' => 'Bombales',
            'email' => 'jemar99@gmail.com',
            'address' => 'Tambong, Gloria, Oriental Mindoro',
            'phone_number' => '09750057524',
            'password' => bcrypt('User456#'),
            'image_url' => ''
        ]);
        DB::table('users')->insert([
            'role_id' => '2',
            'first_name' => 'Desiree Steffhanie',
            'last_name' => 'Manalo',
            'email' => 'Steffhaniemanalo24@gmail.com',
            'address' => 'Malamig, Gloria, Oriental Mindoro',
            'phone_number' => '09504867406',
            'password' => bcrypt('User789#'),
            'image_url' => ''
        ]);
        DB::table('users')->insert([
            'role_id' => '2',
            'first_name' => 'Alyza Rose',
            'last_name' => 'Morada',
            'email' => 'zebgutierrez20@gmail.com',
            'address' => 'Salcedo, Bansud, Oriental Mindoro',
            'phone_number' => '09283920784',
            'password' => bcrypt('User789#'),
            'image_url' => ''
        ]);
        DB::table('users')->insert([
            'role_id' => '2',
            'first_name' => 'Jamae',
            'last_name' => 'Gabao',
            'email' => 'jamaegabao06@gmail.com',
            'address' => 'Poblacion, Bansud, Oriental Mindoro',
            'phone_number' => '09283920784',
            'password' => bcrypt('User100#'),
            'image_url' => ''
        ]);
    }
}


// php artisan make:seeder UsersTableSeeder
// php artisan migrate
// php artisan db:seed --class=DatabaseSeeder
// php artisan db:seed --class=UsersTableSeeder
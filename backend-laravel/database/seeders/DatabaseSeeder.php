<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use \App\Models\Api\ModuleProviders\Role;
use \App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Role::factory(3)->create();
        User::factory(10)->create();
    }
}
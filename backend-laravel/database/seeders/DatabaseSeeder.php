<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use \App\Models\Api\ModuleProviders\Role;
use \App\Models\User;
use \App\Models\Api\ModuleProviders\TypeIdentificacion;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        
        TypeIdentificacion::factory()->create(['description'=>'RUC']);
        TypeIdentificacion::factory()->create(['description'=>'Cédula de identidad']);
        Role::factory(3)->create();
        User::factory(10)->create();
    }
}
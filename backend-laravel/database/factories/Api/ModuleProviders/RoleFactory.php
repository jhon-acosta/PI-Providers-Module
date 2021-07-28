<?php

namespace Database\Factories\Api\ModuleProviders;

use App\Models\Api\ModuleProviders\Role;
use Illuminate\Database\Eloquent\Factories\Factory;

class RoleFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Role::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'description' => $this->faker->unique()->randomElement($array = array ('provider','client','admin')),
        ];
    }
}

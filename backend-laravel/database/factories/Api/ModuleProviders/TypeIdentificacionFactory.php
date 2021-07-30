<?php

namespace Database\Factories\Api\ModuleProviders;

use App\Models\Api\ModuleProviders\TypeIdentificacion;
use Illuminate\Database\Eloquent\Factories\Factory;

class TypeIdentificacionFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = TypeIdentificacion::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'description' => $this->faker->unique()->randomElement(
                $array = array ('RUC','Cédula de identidad','Canét de conadis')
            ),
        ];
    }
}

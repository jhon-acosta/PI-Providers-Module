<?php

namespace App\Models\Api\ModuleProviders;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TypeIdentificacion extends Model
{
    use HasFactory;
    public function users(){
        return $this->hasMany(User::class)->withTimeStamps();
    }
}

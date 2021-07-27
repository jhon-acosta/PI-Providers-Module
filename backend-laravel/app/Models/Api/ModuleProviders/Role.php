<?php

namespace App\Models\Api\ModuleProviders;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    public function users() {
        return $this->hasMany(User::class);
    }
}

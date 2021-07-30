<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ModuleProviders\RoleController;
use App\Http\Controllers\Api\ModuleProviders\UserController;
use App\Http\Controllers\Api\ModuleProviders\TypeIdentificacionController;
use App\Http\Controllers\Api\ModuleProviders\RegisterController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// regsitro
Route::post('/register', [RegisterController::class, 'register']);

// roles
Route::get('/roles', [RoleController::class, 'index']);
Route::post('/roles', [RoleController::class, 'store']);
Route::get('/roles/{id}', [RoleController::class, 'show']);
Route::put('/roles/{id}', [RoleController::class, 'update']);
Route::delete('/roles/{id}', [RoleController::class, 'destroy']);

// users
Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::put('/users/{id}', [UserController::class, 'update']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);

//type Identifications
Route::get('/typeIdentificacions', [TypeIdentificacionController::class, 'index']);
Route::post('/typeIdentificacions', [TypeIdentificacionController::class, 'store']);
Route::get('/typeIdentificacions/{id}', [TypeIdentificacionController::class, 'show']);
Route::put('/typeIdentificacions/{id}', [TypeIdentificacionController::class, 'update']);
Route::delete('/typeIdentificacions/{id}', [TypeIdentificacionController::class, 'destroy']);

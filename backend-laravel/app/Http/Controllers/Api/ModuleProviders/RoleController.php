<?php

namespace App\Http\Controllers\Api\ModuleProviders;

use Illuminate\Http\Request;
use App\Models\Api\ModuleProviders\Role;
use App\Http\Resources\Api\ModuleProviders\RoleResource;

class RoleController extends Controller
{
    public function index()
    {
        $roles = Role::paginate(20);
        return RoleResource::collection($roles);
    }

    public function store(Request $request)
    {
        $role = new Role();
        $role->description = $request->description;

 
        if($role->save()){
            return new RoleResource($role);
        }
    }

    public function show($id)
    {
        $role = Role::findOrFail($id);
        return new RoleResource($role);
    }

    public function update(Request $request, $id)
    {
        $role = Role::findOrFail($id);
        $role->description = $request->description;

 
        if($role->save()){
            return new RoleResource($role);
        }
    }

    public function destroy($id)
    {
        $role = Role::findOrFail($id);

        if ($role->delete()) {
            return new RoleResource($role);
        }
    }
}

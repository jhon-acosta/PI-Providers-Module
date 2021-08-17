<?php

namespace App\Http\Controllers\Api\ModuleProviders;

use Illuminate\Http\Request;
use App\Models\Api\ModuleProviders\Role;
use App\Models\Api\ModuleProviders\TypeIdentificacion;
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

    public function defaultData (Request $request)
    {
        function defaultRoles(){
            $roleOne = new Role();
            $roleOne->id = 1;
            $roleOne->description = 'Proveedor';
            $roleOne->save();

            $roleTwo = new Role();
            $roleTwo->id = 2;
            $roleTwo->description = 'Comprador';
            $roleTwo->save();

            $roleThree = new Role();
            $roleThree->id = 3;
            $roleThree->description = 'Administrador';
            $roleThree->save();
        }

        function defaultTypesId(){
            $type = new TypeIdentificacion();
            $type->id = 1;
            $type->description = 'Cédula de identidad';
            $type->save();  
            $type->id = 2;
            $type = new TypeIdentificacion();
            $type->description = 'RUC';
            $type->save();
            $type->id = 3;
            $type = new TypeIdentificacion();
            $type->description = 'Cárnet de discapacidad';
            $type->save();  
        }
        
        defaultRoles();
        defaultTypesId();

        return response()->json([
            'data' => [
                'message' => 'Succesfully'
            ]
        ]);
    }
}

<?php

namespace App\Http\Controllers\Api\ModuleProviders;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\Api\ModuleProviders\UserResource;

class UserController extends Controller
{
    public function index()
    {
        $users = User::paginate(20);
        return UserResource::collection($users);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $user = new User();
        $user->roleId = $request->roleId;
        $user->typeId = $request->typeId;
        $user->numberIdentification = $request->numberIdentification;
        $user->names = $request->names;
        $user->surnames = $request->surnames;
        $user->email = $request->email;
        $user->password = $request->password;
        $user->cellPhone = $request->cellPhone;
        $user->pathImage = $request->pathImage;
        $user->nameImage = $request->nameImage;
        $user->codeForVerfication = $request->codeForVerfication;
        $user->statusEmailVerified = $request->statusEmailVerified;

        if($user->save()){
            return new UserResource($user);
        }
    }

    public function show($id)
    {
        $user = User::findOrFail($id);
        return new UserResource($user);
    }

    public function edit(Role $role)
    {
        //
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->roleId = $request->roleId;
        $user->typeId = $request->typeId;
        $user->numberIdentification = $request->numberIdentification;
        $user->names = $request->names;
        $user->surnames = $request->surnames;
        $user->email = $request->email;
        $user->password = $request->password;
        $user->cellPhone = $request->cellPhone;
        $user->pathImage = $request->pathImage;
        $user->nameImage = $request->nameImage;
        $user->codeForVerfication = $request->codeForVerfication;
        $user->statusEmailVerified = $request->statusEmailVerified;
 
        if($user->save()){
            return new UserResource($user);
        }
    }

    public function destroy($id)
    {
        if (DB::table('users')->where('id', $id)->delete()) {
            return response()->json([
                'data' => [
                    'id' => $id,
                    'message' => 'user deleted'
                ]
            ], 200);
        }
    }
}

<?php

namespace App\Http\Controllers\Api\ModuleProviders;

use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $user = User::whereEmail($request->email)->first();
        if (!$user) {
            return response()->json([
                "message" => "unregistered mail"
            ]);
        }
        $passwordMoreSomething = '3CV'.$request->password.'5H0PpH1n';
        if (
            $user &&
            Hash::check($passwordMoreSomething, $user->password)
        ) {
        $token = $user->createToken('EcuShopping')->accessToken;
            return response()->json([
                "data" => [
                    "email" => $user->email,
                    "token" => $token,
                ]
            ]);
        };  
        return response()->json([
            "message" => "Invalid password"
        ]);
    }

    public function logout(Request $request)
    {
        $user = auth()->user();
        $user->tokens->each(function ($token, $key) {
            $token->delete();
        });

        return response()->json([
            'data' => [
                'message' => 'Sesión cerrada'
            ]
        ], 200);
    }

    public function currentUser () 
    {
        $current = auth()->guard('api')->user();

        if($current)
        {
            return response()->json([
                'data' => [
                    'id' => $current->id,
                    'roleId' => $current->roleId,
                    'numberIdentification' => $current->numberIdentification,
                    'names' => $current->names,
                    'surnames' => $current->surnames,
                    'email' => $current->email,
                    'cellPhone' => $current->cellPhone,
                    'province' => $current->province,
                ]
            ], 200);
        } else {
            return response()->json([
                'message' => 'unauthenticated user'
            ], 200);
        }

    }
}

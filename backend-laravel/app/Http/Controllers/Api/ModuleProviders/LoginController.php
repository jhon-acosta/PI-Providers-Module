<?php

namespace App\Http\Controllers\Api\ModuleProviders;

use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

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
            $user->statusEmailVerified == 1 &&
            Hash::check($passwordMoreSomething, $user->password)

        ) {
        $token = $user->createToken('EcuShopping')->accessToken;
        $roleName = DB::table('roles')->where('id', $user->roleId)->value('description');
            return response()->json([
                "data" => [
                    "role" => $roleName,
                    "email" => $user->email,
                    "token" => $token,
                ]
            ]);
        } 
        if ($user->statusEmailVerified == 0)
        {
            return response()->json([
                "message" => "Account not verified"
            ]);    
        }   
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
                    'markImage' => $current->markImage,
                    'filePdf' => $current->filePdf,
                    'score' => $current->score,
                ]
            ], 200);
        } else {
            return response()->json([
                'message' => 'unauthenticated user'
            ], 200);
        }

    }
}

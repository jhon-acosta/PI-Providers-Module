<?php

namespace App\Http\Controllers\Api\ModuleProviders;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Mail\PasswordMail;

class PasswordController extends Controller
{
    public function rememberPassword(Request $request)
    {
        if ($user = User::whereEmail($request->email)->first()) {
            $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIKLMNOPQRSTVXYZ+.-/!?';
            $randomPassword = substr(str_shuffle($characters), 0, 10);
            $passwordMoreSomething = '3CV'.$randomPassword.'5H0PpH1n';
            DB::table('users')
                ->where('id', $user->id)
                ->update(['password' => Hash::make($passwordMoreSomething)]);
            $details = [
                'title' => 'Reestablecer contraseña',
                'body' => $randomPassword
            ];
            Mail::to($user->email)->send(new PasswordMail($details));
            return response()->json([
                'data' => [
                    'email' => $user->email,
                ]
            ]);
        } else {
            return response()->json([
                'data' => [
                    'message' => 'Email not found'
                ]
            ]);
        }
    }
}

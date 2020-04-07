<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function show()
    {
        $user =User::all('id','name', 'login', 'firstname', 'age');
        return response()->json($user,200);
    }

    public function register(Request $request)
    {
        $user= new user();
        $user->login = $request->input('login');
        $user->name = $request->input('name');
        $user->firstname = $request->input('firstname');
        $user->email = $request->input('email');
        $user->age = $request->input('age');
        $user->password = encrypt($request->input('password'));
       // $user->confirmpassword = encrypt($request->input('Confirm Password'));
        
            $result=$user->save();
            return response()->json(201);
    }

        public function auth(Request $request) 
        {
            $pass = DB::table('users')
                    ->whereRaw('login = ?', [$request->input('login')])
                    ->get('password');
            $res = json_decode($pass, true);
            $password = decrypt($res[0]['password']);
            if ($request->input('password') == $password) {
                return  response()->json(200);
            } else {
                return  response()->json(400);
            }
        }
    }

    

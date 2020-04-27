<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use function MongoDB\BSON\toJSON;

class UserController extends Controller
{
    public $successStatus = 200;

    /**
     * login api
     *
     * @return \Illuminate\Http\Response
     */
    // public function login(Request $request){
    //     $validator = Validator::make($request->all(), [
    //     'email' => 'required|string',
    //     'password' => 'required|string',
    //     ]);

    //     if ($validator->fails()) {
    //     return response()->json(['errors'=>$validator->errors()],'400');
    //     }

    //     if (!Auth::attempt($request->only(['email', 'password'])))
    //         return response()->json([
    //         'message' => 'error authentification'
    //         ], 400);
    //         $user = $request->user();
    //         $tokenResult = $user->createToken('Personal Access Token');
    //         $token = $tokenResult->token;
    //         $email = $request->email;
    //         if ($request->remember_me)
    //         $token->expires_at = Carbon::now()->addWeeks(1);
    //         $token->save();
    //         return response()->json([
    //         'User'=>[
    //         'email'=> $email,
    //         'token' => $tokenResult->accessToken,
    //         'token_type' => 'Bearer',
    //         'expires_at' => Carbon::parse(
    //         $tokenResult->token->expires_at
    //         )->toDateTimeString()]
    //         ],'200');
    // }

    /**
     * Register api
     *
     * @return \Illuminate\Http\Response
     */
    // //public function register(Request $request) {
    //     $validator = Validator::make($request->all(), [
    //         'name' => 'required|string|max:255',
    //         'email' => 'required|string|email|max:255|unique:users',
    //         'valid' => 'required',
    //         'citie_id' =>'required',
    //         'password' => 'required',
    //     ]);
    //     if ($validator->fails()) {
    //         return response()->json(['error'=>$validator->errors()], 401);
    //     }
    //     $user = new User([
    //         'name' => $request->name,
    //         'email' => $request->email,
    //         'valid' => $request->valid,
    //         'citie_id' => $request->citie_id,
    //         'password' => bcrypt($request->password)
    //         ]);
    //         $user->save();
    //         return response()->json([
    //         'message' => 'Successfully created user!'
    //         ], 200);

    //     $input = $request->all();
    //     $input['password'] = bcrypt($input['password']);
    //     $user = User::create($input);
    //     $success['token'] =  $user->createToken('MyApp')-> accessToken;
    //     $success['name'] =  $user->name;
    //     return response()->json(['success'=>$success], $this-> successStatus);
    // //}

    public function register(Request $request) {

        $validateData = $request->validate([
            'name' => 'required|string|max:55',
            'email' => 'required|string|email|max:255|unique:users',
            //'valid' => 'required',
           // 'citie_id' =>'required',
            'password' => 'required',
        ]);

        $validateData['password'] = bcrypt($request->password);
        $user = User::create($validateData);
        $accessToken = $user->createToken('authToken')->accessToken;
        return response(['user' => $user, 'access_token' => $accessToken]);
    }

    public function login(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|string',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors'=>$validator->errors()],'400');
        }
        $email = DB::table('users')->select('email')->where('email', $request->email)->get();

        if (!Auth::attempt($request->only(['email', 'password']))){
            return response()->json([
                'message' => 'identifiants invalides'
            ], 400);
        }
        //$email = DB::table('users')->select('email')->where('email',$request->email)->get()->jsonSerialize();


        $user = $request->user();
        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;
        $email = $request->email;
        if ($request->remember_me)
            $token->expires_at = Carbon::now()->addWeeks(1);
        $token->save();
        return response()->json([
            'User'=>[
                'email'=> $email,
                'token' => $tokenResult->accessToken,
                'token_type' => 'Bearer',
                'expires_at' => Carbon::parse(
                    $tokenResult->token->expires_at
                )->toDateTimeString()]
            ],'200');
    }
        /**
    * Logout user (Revoke the token)
    *
    * @return [string] message
    */
    public function logout(Request $request){
        $request->user()->token()->revoke();
        return response()->json([
        'message' => 'Vous etes déconnecté'
    ]);
    }

    public function user(Request $request)
    {

        return response()->json($request->user());
    }


    //Get an User
    public function getUser(Request $request, $id){
        $user = User::find($id)->where('id', $id)->first();
        return response()->json($user,200);
    }


    public function modify(Request $request, User $user)
    {
        //$menu1= User::where("id",$request->route('id'));
        //$user2 = $menu1->find($request->route('id'));
        $user2= DB::table('users')->where('id', $request->route('id'))
            ->update(['citie_id' => $request->citie_id,'validate'=> $request->validate]);


            if ($request->citie_id) {
                $user->citie_id = $request->citie_id;
            }
            if ($request->validate) {
                $user->valid = $request->validate;
            }
                //echo $results[$i];
                return response()->json(
                    ['message' => 'Successfully Modified'],200);


        //return response()->json(['message' => 'There is no user '], 400);
    }

    /**
     * details api
     *
     * @return \Illuminate\Http\Response
     */
    public function details(){
        $user = Auth::user();
        return response()->json(['success' => $user], $this-> successStatus);
    }
}

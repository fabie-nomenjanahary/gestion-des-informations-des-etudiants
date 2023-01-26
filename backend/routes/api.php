<?php

use App\Http\Controllers\API\AnneeScolaireController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('annee-scolaires')->group(function () {
    Route::get('/', [AnneeScolaireController::class, 'getAll']);
    Route::get('/{id}', [AnneeScolaireController::class, 'get']);
    Route::post('/', [AnneeScolaireController::class, 'create']);
    Route::put('/{id}', [AnneeScolaireController::class, 'update']);
    Route::delete('/{id}', [AnneeScolaireController::class, 'delete']);
});

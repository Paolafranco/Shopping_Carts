<?php

namespace App\Http\Controllers;

use App\Models\articule;
use App\Models\products;
use App\Models\subCategorie;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use function Symfony\Component\String\s;

class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request): JsonResponse
    {

        /* return $products=products::all(); */
        $products = products::get();
        return response()->json([
            'data' => $products,
            'message' => 'productos obtenidos con éxito'
        ], 200);
    }

    public function articles()
    {
        $article = articule::all();
        return response()->json([
            'data' => $article,
            'message' => 'Aqui los articulos para el id'
        ], 200);
    }

    public function allProducts(Request $request)
    {

        $products = products::select(
            "products.id",
            "products.name",
            "articules.image",
            "products.salePrice",
            "articules.description"

        )
            ->join("articules", "articules.id", "=", "products.id_articules")
            ->get();
        if ($products) {
            return response()->json([
                'data' => $products,
                'message' => 'productos para los detalles obtenidos con exito'
            ], 200);
        } else {
            return response()->json([
                'message' => 'no se encontraron productos'
            ], 404);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function store(Request $request)
    {
        $article = Articule::find($request->input('id_articules'));
        $product = new Products();
        $product->name = $request->name;
        $product->purshePrice = $request->purshePrice;
        $product->salePrice = $request->salePrice;
        $product->expirationDate = $request->expirationDate;
        $product->weight = $request->weight;
        $product->fragility = $request->fragility;
        $product->length = $request->length;
        $product->broad = $request->broad;
        $product->amount = $request->amount;
        /* $product->articules()->associate($article); */
        $product->id_articules = $request->id_articules;
        $product->save();
        return response()->json([
            'data' => $product,
            'msg' => [
                'summary' => 'success',
                'detail' => '',
                'code' => '201'
            ]
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\products  $products
     * @return \Illuminate\Http\Response
     */
    public function show(products $id)
    {
        return $id;
    }
    public function showProduct($id)
    {

        $products = DB::table('products')
        ->join("articules", "articules.id", "=", "products.id_articules")
        ->select("products.*","articules.*")
        ->where(['products.id' => $id])
        ->get();
        if ($products) {
                return response()->json([
                    'data' => $products,
                    'message' => 'Detalles de los productos obtenidos con éxito'
                ], 200);
            }else{
                return response()->json([
                    'message' => 'no se encontraron productos'
                ], 404);
            }
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\products  $products
     * @return \Illuminate\Http\Response
     */
    public function searchProducts(Request $request)
    {
        //
        $products = products::where('name', $request->name)->get();
        return $products;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\products  $products
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, products $products, $id)
    {
        $products = products::find($id);
        $products->name = $request->get("name");
        $products->purshePrice = $request->get("purshePrice");
        $products->salePrice = $request->get("salePrice");
        $products->expirationDate = $request->get("expirationDate");
        $products->weight = $request->get("weight");
        $products->fragility = $request->get("fragility");
        $products->length = $request->get("length");
        $products->broad = $request->get("broad");
        $products->fragility = $request->get("amount");
        $products->save();
        return $products;
        if ($products) {
            echo "editar con exito";
        } else {
            echo "nel pastel";
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\products  $products
     * @return \Illuminate\Http\Response
     */
    public function destroy(products $products, $id)
    {
        $products = products::find($id);
        $products->delete();
        return "eliminado con exito";
    }
}

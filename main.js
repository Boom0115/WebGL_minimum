window.onload = function() {
	// HTML上のcanvasへの参照を取得する
	var c = document.getElementById('canvas')
	
	// キャンバスサイズを設定
	c.width = 512
	c.height = 512
	
	// canvasからWebGLコンテキストを取得
	var gl = c.getContext('webgl')
	
	// WebGLを使用可能かチェック
	if (!gl) {
		alert('webgl not supported!')
		return
	}
	
	// クリアカラーを設定
	gl.clearColor(0.0, 0.0, 0.0, 1.0)
	
	// キャンバスをクリア
	gl.clear(gl.COLOR_BUFFER_BIT)
	
	// 三角形データを生成
	var triangleData = genTriangle()
	
	// 頂点データからバッファを生成
	var vertexBuffer = gl.createBuffer()
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleData.p), gl.STATIC_DRAW)
	
	// シェーダーとプログラムオブジェクト
	var vertexSource   = document.getElementById('vs').textContent
	var fragmentSource = document.getElementById('fs').textContent
	var vertexShader   = gl.createShader(gl.VERTEX_SHADER)
	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
	var programs = gl.createProgram()
	
	gl.shaderSource(vertexShader, vertexSource)
	gl.compileShader(vertexShader)
	gl.attachShader(programs, vertexShader)
	
	gl.shaderSource(fragmentShader, fragmentSource)
	gl.compileShader(fragmentShader)
	gl.attachShader(programs, fragmentShader)
	
	gl.linkProgram(programs)
	gl.useProgram(programs)
	
	// プログラムオブジェクトに頂点データを登録
	var attLocation = gl.getAttribLocation(programs, 'position')
	gl.enableVertexAttribArray(attLocation)
	gl.vertexAttribPointer(attLocation, 3, gl.FLOAT, false, 0, 0)
	
	// 描画
	gl.drawArrays(gl.TRIANGLES, 0, triangleData.p.length / 3)
	gl.flush()
};

function genTriangle() {
	var obj = {};
	obj.p = [
		 0.0,  0.5,  0.0,
		 0.5, -0.5,  0.0,
		-0.5, -0.5,  0.0,
	];
	return obj;
}

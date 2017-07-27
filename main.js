window.onload = function() {
	// HTML���canvas�ւ̎Q�Ƃ��擾����
	var c = document.getElementById('canvas')
	
	// �L�����o�X�T�C�Y��ݒ�
	c.width = 512
	c.height = 512
	
	// canvas����WebGL�R���e�L�X�g���擾
	var gl = c.getContext('webgl')
	
	// WebGL���g�p�\���`�F�b�N
	if (!gl) {
		alert('webgl not supported!')
		return
	}
	
	// �N���A�J���[��ݒ�
	gl.clearColor(0.0, 0.0, 0.0, 1.0)
	
	// �L�����o�X���N���A
	gl.clear(gl.COLOR_BUFFER_BIT)
	
	// �O�p�`�f�[�^�𐶐�
	var triangleData = genTriangle()
	
	// ���_�f�[�^����o�b�t�@�𐶐�
	var vertexBuffer = gl.createBuffer()
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleData.p), gl.STATIC_DRAW)
	
	// �V�F�[�_�[�ƃv���O�����I�u�W�F�N�g
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
	
	// �v���O�����I�u�W�F�N�g�ɒ��_�f�[�^��o�^
	var attLocation = gl.getAttribLocation(programs, 'position')
	gl.enableVertexAttribArray(attLocation)
	gl.vertexAttribPointer(attLocation, 3, gl.FLOAT, false, 0, 0)
	
	// �`��
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

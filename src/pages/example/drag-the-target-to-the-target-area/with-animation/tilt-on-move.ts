export interface Position {
  x: number;
  y: number;
}

export interface CalculateRotation3DOptions {
  maxAngle: number;
  angleFactor: number;
}

export const DEFAULT_CALCULATE_ROTATION_3D_OPTIONS: CalculateRotation3DOptions = {
  maxAngle: 45,
  angleFactor: 0.1,
};

export function calculateRotation3D(
  lastPosition: Position,
  nextPosition: Position,
  options?: CalculateRotation3DOptions
): {
  x: number;
  y: number;
  deg: number;
} {
  const mergedOptions = { ...DEFAULT_CALCULATE_ROTATION_3D_OPTIONS, ...options };

  const dx = nextPosition.x - lastPosition.x;
  const dy = nextPosition.y - lastPosition.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // 根据位移距离计算基础倾斜角度，并限制在最大倾角以内
  let angle = Math.min(distance * 0.1, mergedOptions.maxAngle);

  // 根据位移大小和方向计算旋转轴参数
  // 这里标准化轴向量，使得总长度等于1
  const length = Math.sqrt(dx * dx + dy * dy);
  const axisX = dx / length;
  const axisY = dy / length;

  // 返回rotate3D变换字符串
  return {
    x: axisX,
    y: axisY,
    deg: angle,
  };
}

/**
 * 定时（默认 100ms）监听 DOM 位置，计算旋转角度，并修改其样式，返回清理函数
 */
export function tiltOnMove(
  element: HTMLElement,
  options?: CalculateRotation3DOptions,
): () => void {
  let lastPosition: Position = { x: 0, y: 0 };

  const handleMouseMove = (event: MouseEvent) => {
    const nextPosition = { x: event.clientX, y: event.clientY };
    const { x, y, deg } = calculateRotation3D(lastPosition, nextPosition, options);
    element.style.transform = `rotate3d(${x}, ${y}, 0, ${deg}deg)`;
    lastPosition = nextPosition;
  };

  document.addEventListener("mousemove", handleMouseMove);

  return () => {
    document.removeEventListener("mousemove", handleMouseMove);
  };
}

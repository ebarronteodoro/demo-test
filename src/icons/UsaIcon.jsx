const UsaIcon = (props) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      width={props.width}
      height={props.height}
      fill='none'
      viewBox='0 0 64 64'
    >
      <path fill='url(#a)' d='M0 0h64v64H0z' />
      <defs>
        <pattern id='a' width='1' height='1' patternContentUnits='objectBoundingBox'>
          <use xlinkHref='#b' transform='scale(.01042)' />
        </pattern>
        <image
          xlinkHref='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAACB0lEQVR4nO2YsUoDQRCG40ulvWIrS0EbsVREVLARQRF8AJ/AWrEKNqYQESw0ERRLEVFEsREWDslWQlzZgCEJGm3Omdx8Hwy3d9uE/9/ZmUmlAgAAAAAAAAAAAAAAAAAAJogxjmUT9TgKEVx1JAMDHAaQAT/BFVTVdwXt7N4OPbFF7i9vNOPSesNuDZhfPYuJhbXzb0Uoer959Robl6/2DJhZPI1PL63Ybn90BErP9J6+/8f+/sFDbIX3+EVap2+9Bvj8bSTjzxmwtX0de0nvvQIUuT8+fRRv7vLuXlqnb6YMmJo76RNocvakT4Ci9w+Pn7t7aT14BZXegFQA92r3HaHSM70PFsgi92v1x7iyedGJtDZngPbwCsTEgNxQBmibB4KFOUDzPBAsGKB5HghWMkDrPBCsGKB1HghWDNA6DwQrBmgNr6ClZA7IDcwB2vr/zFIGaOz/MwsGaO7/MwsGaO7/MysGaO3/MyttqNb+P7NigPYICsTEACcvKBng5EXlCnIlqgHSbZoveWBAjgHip9CTAfJCeK4geTGoAbm9+LUIS7dpoeSBAQ4DxE9hIAPkhQhcQfJiUAOcveCviFx5Gyr9A33JAwNyDBA/hZ4MkBfCcwXJi6GyBki3aaHkgQEOA8RPYSAD5IUIXEHyYlADnL0YWoQBAAAAAAAAAAAAAAAAAAAAKmXhE0VQ/rCIcNGYAAAAAElFTkSuQmCC'
          id='b'
          width='96'
          height='96'
        />
      </defs>
    </svg>
  )
}

export default UsaIcon

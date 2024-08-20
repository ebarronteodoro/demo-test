const SpainIcon = (props) => {
  const uniqueId = props.id || 'pattern-spain'
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={props.width} height={props.height} fill='none' viewBox='0 0 64 64'>
      <rect width='64' height='64' fill={`url(#${uniqueId})`} />
      <defs>
        <pattern id={uniqueId} patternContentUnits='objectBoundingBox' width='1' height='1'>
          <use xlinkHref='#image-spain' transform='scale(0.0104167)' />
        </pattern>
        <image id='image-spain' width='96' height='96' xlinkHref='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAABKUlEQVR4nO3cwQ2DMQiD0dz+Zdj/nkGYhe5QqXJb3iexgG3wJco5AAAAAAAAAAAAwCq6zpjzMQ0YUNmAMaAYsPrEHR1wGJBOYduAvBDtBOXF0AG1b5RwMSCewrYBeSHaCcqLoQNq3yjhYkA8hf3NGzD3GfN8TAMG3GzAGHAZsPrEHR3wMCCdwrEBeSHGCcqLoQPuvlHClwHxFI4NyAsxTlBeDB1w940SvgyIp3BsQF6IcYLyYuiAu2+U8GVAPIVjA/JCjBOUF0MH3H2jhC8D4ikcG5AXYpygvBhf2QHpx6v958OAYkA8hW0D8kK0E5QXQwfUvlHCxYB4CtsG5IVoJygvhg6ofaOEiwHxFLYNyAvRTlBeDB1Q++a9D6UBAAAAAAAAAACA86O8ABveDKDw0LOGAAAAAElFTkSuQmCC' />
      </defs>
    </svg>
  )
}

const UsaIcon = (props) => {
  const uniqueId = props.id || 'pattern-usa'
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={props.width} height={props.height} fill='none' viewBox='0 0 64 64'>
      <rect width='64' height='64' fill={`url(#${uniqueId})`} />
      <defs>
        <pattern id={uniqueId} patternContentUnits='objectBoundingBox' width='1' height='1'>
          <use xlinkHref='#image-usa' transform='scale(0.01042)' />
        </pattern>
        <image id='image-usa' width='96' height='96' xlinkHref='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAACB0lEQVR4nO2YsUoDQRCG40ulvWIrS0EbsVREVLARQRF8AJ/AWrEKNqYQESw0ERRLEVFEsREWDslWQlzZgCEJGm3Omdx8Hwy3d9uE/9/ZmUmlAgAAAAAAAAAAAAAAAAAAJogxjmUT9TgKEVx1JAMDHAaQAT/BFVTVdwXt7N4OPbFF7i9vNOPSesNuDZhfPYuJhbXzb0Uoer959Robl6/2DJhZPI1PL63Ybn90BErP9J6+/8f+/sFDbIX3+EVap2+9Bvj8bSTjzxmwtX0de0nvvQIUuT8+fRRv7vLuXlqnb6YMmJo76RNocvakT4Ci9w+Pn7t7aT14BZXegFQA92r3HaHSM70PFsgi92v1x7iyedGJtDZngPbwCsTEgNxQBmibB4KFOUDzPBAsGKB5HghWMkDrPBCsGKB1HghWDNA6DwQrBmgNr6ClZA7IDcwB2vr/zFIGaOz/MwsGaO7/MwsGaO7/MysGaO3/MyttqNb+P7NigPYICsTEACcvKBng5EXlCnIlqgHSbZoveWBAjgHip9CTAfJCeK4geTGoAbm9+LUIS7dpoeSBAQ4DxE9hIAPkhQhcQfJiUAOcveCviFx5Gyr9A33JAwNyDBA/hZ4MkBfCcwXJi6GyBki3aaHkgQEOA8RPYSAD5IUIXEHyYlADnL0YWoQBAAAAAAAAAAAAAAAAAAAAKmXhE0VQ/rCIcNGYAAAAAElFTkSuQmCC' />
      </defs>
    </svg>
  )
}

export default { SpainIcon, UsaIcon }

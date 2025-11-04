// componentes/Textarea.jsx
import { CampoDeTexto } from './CampoDeTexto'; // Importa do mesmo diretório

export function Textarea({ style, ...props }) {
  return (
    <CampoDeTexto
      multiline={true}
      numberOfLines={4}
      style={[{ height: 100, textAlignVertical: 'top', paddingTop: 12 }, style]}
      {...props}
    />
  );
}
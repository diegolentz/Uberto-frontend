    export const estilosInput = {
        "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#a737fc" }, // Borde por defecto
            "&:hover fieldset": { borderColor: "#a737fc" }, // Evita cambio al pasar el mouse
            "&.Mui-focused fieldset": { borderColor: "#a737fc" }, // Evita cambio al enfocar
            //  cuando clickeo me cambia a azul, no debe cambiar el border

        },
        "& .MuiOutlinedInput-notchedOutline": { borderColor: "#a737fc" },
        "& .MuiInputLabel-root": { color: "black" }, // Hace que el label sea negro
        "& .MuiInputLabel-root.Mui-focused": { color: "black" }, // Mantiene el color al enfocar
    };
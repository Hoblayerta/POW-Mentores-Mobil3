# 🎰 ServerLottery DApp - Scaffold-ETH 2 on Monad Testnet

<h4 align="center">
  <a href="https://docs.scaffoldeth.io">Documentation</a> |
  <a href="https://scaffoldeth.io">Website</a> |
  <a href="https://testnet.monadexplorer.com">Monad Explorer</a>
</h4>

🎲 **ServerLottery** es una aplicación descentralizada de lotería construida con Scaffold-ETH 2 y desplegada en la red de pruebas Monad. Este proyecto permite la gestión transparente de una lotería donde un servidor autorizado designa ganadores y los participantes pueden reclamar sus premios de forma descentralizada.

🧪 Built using NextJS, RainbowKit, Hardhat, Wagmi, Viem, and Typescript, specifically configured for Monad Testnet.

## 🚀 Características del Proyecto

- **🎰 Smart Contract de Lotería**: Contrato `ServerLottery.sol` que gestiona fondos, ganadores y premios
- **🖥️ Interfaz Web Interactiva**: Frontend completo para interactuar con el contrato
- **🔐 Roles Diferenciados**: Owner, Server y Winner con permisos específicos
- **💰 Gestión de Fondos**: Recepción y distribución automática de premios
- **🌐 Integración con Monad**: Configurado para trabajar con la red de pruebas Monad
- **🔍 Verificación de Contratos**: Soporte para verificación en Monad Explorer

## 🎯 Funcionalidades Principales

### Smart Contract (`ServerLottery.sol`)
- **Recepción de Fondos**: Acepta ETH como premio de la lotería
- **Designación de Ganador**: Solo el servidor autorizado puede designar ganadores
- **Reclamación de Premio**: Los ganadores pueden retirar el premio completo
- **Gestión de Roles**: Sistema de permisos Owner/Server
- **Eventos**: Registro transparente de todas las transacciones

### Frontend Web (`/lottery`)
- **Dashboard Interactivo**: Visualización del estado del contrato en tiempo real
- **Gestión de Roles**: Interfaz diferenciada según el rol del usuario
- **Envío de Fondos**: Cualquier usuario puede contribuir al premio
- **Designación de Ganadores**: Interfaz exclusiva para el servidor
- **Reclamación de Premios**: Portal para que los ganadores retiren sus premios

## 🏗️ Arquitectura Scaffold-ETH 2

- ✅ **Contract Hot Reload**: Tu frontend se adapta automáticamente a los cambios del smart contract
- 🪝 **[Custom hooks](https://docs.scaffoldeth.io/hooks/)**: Hooks de React que simplifican las interacciones con contratos
- 🧱 [**Components**](https://docs.scaffoldeth.io/components/): Componentes web3 listos para usar
- 🔥 **Burner Wallet & Local Faucet**: Prueba rápida con wallets temporales
- 🔐 **Integration with Wallet Providers**: Conexión con diferentes proveedores de wallets

[![Captura-desde-2025-07-11-00-41-53.png](https://i.postimg.cc/5223fv8D/Captura-desde-2025-07-11-00-41-53.png)](https://postimg.cc/6yFR08jh)

## Requirements

Before you begin, you need to install the following tools:

- [Node (>= v20.18.3)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## 🚀 Guía de Inicio Rápido

### Desarrollo Local

1. **Instalar dependencias**:
```bash
yarn install
```

2. **Ejecutar red local** (terminal 1):
```bash
yarn chain
```
Inicia una red Ethereum local usando Hardhat para desarrollo y testing.

3. **Desplegar contratos** (terminal 2):
```bash
yarn deploy
```
Despliega el contrato `ServerLottery` en la red local.

4. **Iniciar frontend** (terminal 3):
```bash
yarn start
```
Visita `http://localhost:3000` para acceder a la aplicación.

### Despliegue en Monad Testnet

1. **Configurar variables de entorno**:
```bash
# Agregar tu clave privada en packages/hardhat/.env
DEPLOYER_PRIVATE_KEY=your_private_key_here
```

2. **Desplegar en Monad**:
```bash
yarn deploy --network monadTestnet
```

3. **Verificar contrato**:
```bash
yarn hardhat-verify --network monadTestnet <CONTRACT_ADDRESS>
```

### 🎮 Cómo Usar la Aplicación

1. **Acceder a la Lotería**: Navega a `/lottery` en tu aplicación
2. **Enviar Fondos**: Cualquier usuario puede contribuir ETH al premio
3. **Designar Ganador**: Solo el servidor puede elegir un ganador
4. **Reclamar Premio**: El ganador puede retirar todo el balance del contrato

### ⚡ Comandos Útiles

```bash
yarn test                    # Ejecutar tests del smart contract
yarn hardhat:test          # Tests específicos de Hardhat
yarn lint                   # Verificar código
yarn format                 # Formatear código
```

### 📁 Estructura del Proyecto

```
packages/
├── hardhat/
│   ├── contracts/
│   │   └── ServerLottery.sol     # Smart contract principal
│   ├── deploy/                   # Scripts de despliegue
│   └── test/                     # Tests del contrato
└── nextjs/
    ├── app/
    │   ├── lottery/              # Página de la lotería
    │   └── page.tsx              # Página principal
    └── components/               # Componentes reutilizables
```


## 🔍 Verificación de Contratos en Monad

### Configuración Automática para Monad Testnet

El proyecto está preconfigurado para verificar contratos en Monad Explorer usando Sourcify.

**Configuración en `packages/hardhat/hardhat.config.ts`:**
```typescript
sourcify: {
  enabled: true,
  apiUrl: "https://sourcify-api-monad.blockvision.org",
  browserUrl: "https://testnet.monadexplorer.com",
}
```

### Proceso de Verificación

1. **Desplegar contrato**:
```bash
yarn deploy --network monadTestnet
```

2. **Verificar automáticamente**:
```bash
yarn hardhat-verify --network monadTestnet <CONTRACT_ADDRESS>
```

3. **Ver en Monad Explorer**: 
   - Visita: `https://testnet.monadexplorer.com/address/<CONTRACT_ADDRESS>`
   - El código fuente estará disponible públicamente

## 🎰 Detalles del Smart Contract

### ServerLottery.sol

```solidity
// Funciones principales:
- receive() payable          # Recibir fondos ETH
- setWinner(address)         # Designar ganador (solo server)
- sendPrize()               # Reclamar premio (solo winner)
- setServer(address)        # Cambiar servidor (solo owner)
- getBalance()              # Consultar balance
```

### Roles y Permisos

| Rol | Permisos |
|-----|----------|
| **Owner** | Cambiar servidor autorizado |
| **Server** | Designar ganadores de la lotería |
| **Winner** | Reclamar el premio una vez designado |
| **Usuarios** | Enviar fondos al contrato |

### Eventos del Contrato

```solidity
event FundsReceived(address from, uint256 amount);
event WinnerSet(address indexed winner);
event PrizeSent(address indexed winner, uint256 amount);
```

## 🛡️ Seguridad y Mejores Prácticas

- ✅ **Verificación de Roles**: Modificadores `onlyOwner` y `onlyServer`
- ✅ **Prevención de Reentrancia**: Patrón check-effects-interactions
- ✅ **Validación de Direcciones**: Verificación de address(0)
- ✅ **Estado del Premio**: Control de `prizeClaimed` para evitar doble gasto
- ✅ **Eventos**: Registro transparente de todas las operaciones

## 🔗 Enlaces Útiles

### Documentación y Recursos
- [Scaffold-ETH 2 Docs](https://docs.scaffoldeth.io) - Documentación oficial
- [Scaffold-ETH 2 Website](https://scaffoldeth.io) - Página principal del proyecto
- [Monad Testnet Explorer](https://testnet.monadexplorer.com) - Explorador de bloques
- [Monad Documentation](https://docs.monad.xyz) - Documentación de Monad

### Herramientas de Desarrollo
- [Hardhat](https://hardhat.org/) - Framework de desarrollo Ethereum
- [Next.js](https://nextjs.org/) - Framework React para producción
- [Wagmi](https://wagmi.sh/) - Hooks React para Ethereum
- [RainbowKit](https://rainbowkit.com/) - Librería de conexión de wallets

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para contribuir a este proyecto:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

Para contribuir a Scaffold-ETH 2, consulta [CONTRIBUTING.MD](https://github.com/scaffold-eth/scaffold-eth-2/blob/main/CONTRIBUTING.md).

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo [LICENSE](./LICENCE) para más detalles.

## 🆘 Soporte

Si encuentras algún problema o tienes preguntas:

1. Revisa la [documentación de Scaffold-ETH 2](https://docs.scaffoldeth.io)
2. Busca en los [issues existentes](https://github.com/scaffold-eth/scaffold-eth-2/issues)
3. Crea un nuevo issue si es necesario

---

<div align="center">
  <p>Construido con ❤️ usando Scaffold-ETH 2 en Monad Testnet</p>
</div>

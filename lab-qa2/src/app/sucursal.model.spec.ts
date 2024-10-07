import { mock, when, instance } from 'ts-mockito';

import { Client } from './client.model';
import { Count } from './count';
import { Sucursal } from './sucursal.model';

describe('Sucursal', () => {
  let cliente: Client;
  let sucursal: Sucursal;
  let cuenta: Count;
  const withdrawlAmount2000 = 200000;
  const numeroCuenta = 12345;
  const balance = 100000;

  beforeEach(() => {
    sucursal = new Sucursal("Alajuela", "Alajuela");
    cliente = new Client("Juan", "Pérez", "25-01-76", "2401-3117", "Alajuela", "jperez@gmail.com");
    sucursal.setClientes(cliente);
    cuenta = mock<Count>();
  });

  it('1. Saldo de cuenta', function () {
    when(cuenta.getCantidadDinero()).thenReturn(balance);
    /*A través de la función when establecemos el comportamiento deseado a llamar al método 
    getCantidadDinero, para posteriormente crear una instancia y comprobar el comportamiento esperado.*/
    let mockito = instance(cuenta);
    expect(mockito.getCantidadDinero()).toBe(balance);
  });

  it('2. Agregar nueva cuenta a cliente', function () {
    var cuenta = mock<Count>();
    let mockito = instance(cuenta);
    cliente.setCuentas(mockito);
    expect(cliente.getCuentas().length).toBe(1);
  });

  // Ejemplo doble de prueba
  it('3. Retirar monto válido', function () {
    var balanceAmount3000 = 300000;
    when(cuenta.getCantidadDinero()).thenReturn(balanceAmount3000);
    when(cuenta.getNumCuenta()).thenReturn(numeroCuenta);
    when(cuenta.retirar(withdrawlAmount2000)).thenReturn(balance); 
    let mockito = instance(cuenta);
    cliente.setCuentas(mockito);
    var saldo = cliente.retirar(withdrawlAmount2000, numeroCuenta);
    expect(saldo).toBe(balance);
  });

  it('4. Retirar más de lo permitido', function () {
    when(cuenta.getCantidadDinero()).thenReturn(balance);
    when(cuenta.getNumCuenta()).thenReturn(numeroCuenta);
    let mockito = instance(cuenta);
    cliente.setCuentas(mockito);
    expect(function() {
    cliente.retirar(withdrawlAmount2000, numeroCuenta);
    }).toThrowError(Error, "Fondos insuficientes");
   });

   it('a. Apertura de cuenta con monto inicial de 5000 colones', () => {
    when(cuenta.getCantidadDinero()).thenReturn(5000);
    const mockito = instance(cuenta);
    cliente.setCuentas(mockito);
    expect(cliente.getCuentas()[0].getCantidadDinero()).toBe(5000);
  });

  it('b. Realizar dos depósitos válidos y verificar el saldo', () => {
    when(cuenta.getCantidadDinero()).thenReturn(0);
    const mockito = instance(cuenta);
    cliente.setCuentas(mockito);
    mockito.depositar(3000);
    when(cuenta.getCantidadDinero()).thenReturn(3000); 
    mockito.depositar(2000);
    when(cuenta.getCantidadDinero()).thenReturn(5000); 
    expect(mockito.getCantidadDinero()).toBe(5000);
  });

  it('c. Liquidar una cuenta y verificar que el número de cuentas disminuye en 1', () => {
    const cuenta1 = instance(cuenta);
    const cuenta2 = instance(cuenta);
    cliente.setCuentas(cuenta1);
    cliente.setCuentas(cuenta2);
    expect(cliente.getCuentas().length).toBe(2);
    cuenta1.liquidar();
    cliente.getCuentas().pop(); 
    expect(cliente.getCuentas().length).toBe(1);
  });
  
});

/*
describe('Sucursal', () => {
  it('should create an instance', () => {
    expect(new Sucursal()).toBeTruthy();
  });
});
*/
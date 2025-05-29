// src/shared/domain/__tests__/value-object.test.ts

import { ValueObject } from "src/shared/domain/value-objects/value-object";

// Asumiendo que value-object.ts está en shared/domain

// --- Value Objects de prueba ---

interface SimpleValueObjectProps {
  value: string;
}

class SimpleValueObject extends ValueObject<SimpleValueObjectProps> {
  constructor(value: string) {
    super({ value });
  }

  get value(): string {
    return this.props.value;
  }
}

interface NestedValueObjectProps {
  id: string;
  simpleVo: SimpleValueObject;
}

class NestedValueObject extends ValueObject<NestedValueObjectProps> {
  constructor(id: string, simpleVo: SimpleValueObject) {
    super({ id, simpleVo });
  }

  get id(): string {
    return this.props.id;
  }

  get simpleVo(): SimpleValueObject {
    return this.props.simpleVo;
  }
}

// --- Pruebas unitarias para ValueObject ---

describe('ValueObject', () => {
  // Escenario 1: Comparación de igualdad entre Value Objects simples
  describe('Dado dos Value Objects simples', () => {
    const vo1 = new SimpleValueObject('testValue');
    const vo2 = new SimpleValueObject('testValue');
    const vo3 = new SimpleValueObject('anotherValue');

    describe('Cuando se comparan dos SimpleValueObjects idénticos', () => {
      const result = vo1.equals(vo2);

      it('Entonces debería retornar verdadero', () => {
        expect(result).toBe(true);
      });
    });

    describe('Cuando se comparan dos SimpleValueObjects diferentes', () => {
      const result = vo1.equals(vo3);

      it('Entonces debería retornar falso', () => {
        expect(result).toBe(false);
      });
    });

    describe('Cuando se compara un SimpleValueObject con nulo o indefinido', () => {
      it('Entonces debería retornar falso al comparar con nulo', () => {
        expect(vo1.equals(undefined)).toBe(false);
      });

      it('Entonces debería retornar falso al comparar con indefinido', () => {
        expect(vo1.equals(undefined)).toBe(false);
      });
    });

    describe('Cuando se compara un SimpleValueObject con un objeto con propiedades indefinidas', () => {
      it('Entonces debería retornar falso', () => {
        const malformedVo = { props: undefined } as any; // Simula un objeto mal formado
        expect(vo1.equals(malformedVo)).toBe(false);
      });
    });

    describe('Cuando se compara un SimpleValueObject con un tipo de ValueObject diferente', () => {
      class DifferentValueObject extends ValueObject<{ data: string }> {
        constructor(data: string) {
          super({ data });
        }
      }
      const differentVo = new DifferentValueObject('testValue');

      it('Entonces debería retornar falso', () => {
        expect(vo1.equals(differentVo as any)).toBe(false);
      });
    });
  });

  // Escenario 2: Inmutabilidad de Value Objects
  describe('Dado una instancia de SimpleValueObject', () => {
    const initialValue = 'immutableTest';
    const vo = new SimpleValueObject(initialValue);

    describe('Cuando se intenta modificar sus propiedades directamente', () => {
      it('Entonces debería prevenir la modificación y el valor debería permanecer inalterado', () => {
        const attemptModification = () => {
          // @ts-ignore
          vo.props.value = 'modifiedValue';
        };

        expect(attemptModification).toThrow(TypeError);
        expect(vo.value).toBe(initialValue);
      });
    });
  });

  // Escenario 3: Comparación de igualdad entre Value Objects anidados
  describe('Dado dos Value Objects anidados con Value Objects simples anidados', () => {
    const simpleVoA = new SimpleValueObject('nestedA');
    const simpleVoB = new SimpleValueObject('nestedA');
    const simpleVoC = new SimpleValueObject('nestedC');

    const nestedVo1 = new NestedValueObject('id1', simpleVoA);
    const nestedVo2 = new NestedValueObject('id1', simpleVoB);
    const nestedVo3 = new NestedValueObject('id2', simpleVoA);
    const nestedVo4 = new NestedValueObject('id1', simpleVoC);

    describe('Cuando se comparan dos NestedValueObjects que son profundamente idénticos', () => {
      const result = nestedVo1.equals(nestedVo2);

      it('Entonces debería retornar verdadero', () => {
        expect(result).toBe(true);
      });
    });

    describe('Cuando se comparan dos NestedValueObjects con propiedades principales diferentes (id)', () => {
      const result = nestedVo1.equals(nestedVo3);

      it('Entonces debería retornar falso', () => {
        expect(result).toBe(false);
      });
    });

    describe('Cuando se comparan dos NestedValueObjects con Value Objects anidados diferentes', () => {
      const result = nestedVo1.equals(nestedVo4);

      it('Entonces debería retornar falso', () => {
        expect(result).toBe(false);
      });
    });
  });

  // Escenario 4: Comparación de igualdad con propiedades que no son Value Objects anidados
  describe('Dado un ValueObject con una propiedad anidada que no es un ValueObject', () => {
    interface MixedProps {
      primitive: string;
      plainObject: { key: string };
    }

    class MixedValueObject extends ValueObject<MixedProps> {
      constructor(primitive: string, plainObject: { key: string }) {
        super({ primitive, plainObject });
      }
    }

    const obj1 = { key: 'value' };
    const obj2 = { key: 'value' };
    const obj3 = { key: 'anotherValue' };

    const mixedVo1 = new MixedValueObject('a', obj1);
    const mixedVo2 = new MixedValueObject('a', obj1);
    const mixedVo3 = new MixedValueObject('a', obj2);
    const mixedVo4 = new MixedValueObject('a', obj3);

    describe('Cuando se comparan ValueObjects con objetos anidados no-VO idénticos (misma referencia)', () => {
      const result = mixedVo1.equals(mixedVo2);
      it('Entonces debería retornar verdadero', () => {
        expect(result).toBe(true);
      });
    });

    describe('Cuando se comparan ValueObjects con objetos anidados no-VO idénticos (referencia diferente, mismo contenido)', () => {
      const result = mixedVo1.equals(mixedVo3);
      it('Entonces debería retornar falso debido a la igualdad estricta para no-VOs', () => {
        expect(result).toBe(false);
      });
    });

    describe('Cuando se comparan ValueObjects con objetos anidados no-VO diferentes', () => {
      const result = mixedVo1.equals(mixedVo4);
      it('Entonces debería retornar falso', () => {
        expect(result).toBe(false);
      });
    });
  });
});
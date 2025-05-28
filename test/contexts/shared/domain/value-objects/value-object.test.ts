import { Name } from 'src/contexts/educational-center-management/educational-center/domain/values-objects/name.vo';
import { ValueObject } from 'src/shared/domain/value-objects/value-object';

describe('Prueba a la clase abstracta de Value Objects, value-object.ts', () => {
  //SETUP
  interface ValueObjetTest {
    text: string;
    name: Name
  }
  class TestVO extends ValueObject<ValueObjetTest> {
    private constructor(props: ValueObjetTest) {
      super(props);
    }
    static create(text: string, name:string) {
      return new TestVO({ text: text, name: Name.create(name) });
    }
  }

  test('Debe crear una instancia del value object.', () => {
    //Given
    let testVO;
    //When
    testVO = TestVO.create('Probando instancia', 'Algun nombre');
    //Then
    expect(testVO).toBeInstanceOf(TestVO);
  });

  test('Verificar la inmutabilidad del Value Object', () => {
    const vo = TestVO.create('Probando inmutabilidad', 'Algun nombre');
    expect(() => {
      (vo as any).props.name = 'Intentando romper la inmutabilidad';
      (vo as any).props.text = 'Intentando romper la inmutabilidad';
    }).toThrow();
  });

    test('Debe comprar dos value objects con el mismo valor.', () => { 
        //Given
        let testVO1:TestVO;
        let testVO2:TestVO;
        //When
        testVO1 = TestVO.create('Texto a comprar', 'Algun nombre');
        testVO2 = TestVO.create('Texto a comprar', 'Algun nombre');
        //Then
        expect(testVO1.equals(testVO2)).toBe(true);
        expect(testVO2.equals(testVO1)).toBe(true);
    })

    test('Debe comprar dos value objects con valores distintos', () => { 
        //Given
        let testVO1:TestVO;
        let testVO2:TestVO;
        //When
        testVO1 = TestVO.create('Texto a comprar', 'Algun nombre');
        testVO2 = TestVO.create('Texto a comprar Modificado', 'Algun nombre');
        //Then
        expect(testVO1.equals(testVO2)).toBe(false);
    })
});

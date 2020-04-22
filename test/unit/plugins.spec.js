import { expect } from '@lykmapipo/mongoose-test-helpers';
import Predefine from '../../src/predefine.model';

describe('Predefine Plugins', () => {
  it('should expose namespaced fakers', () => {
    expect(Predefine.fakeSetting).to.exist;
    const setting = Predefine.fakeSetting();
    expect(setting.namespace).to.be.equal('Setting');
    expect(setting.bucket).to.be.equal('settings');
    expect(Predefine.fakeSetting(2)).to.have.length(2);

    expect(Predefine.fakeCurrency).to.exist;
    const currency = Predefine.fakeCurrency();
    expect(currency.namespace).to.be.equal('Currency');
    expect(currency.bucket).to.be.equal('currencies');
    expect(Predefine.fakeCurrency(2)).to.have.length(2);

    expect(Predefine.fakeCategory).to.exist;
    const caregory = Predefine.fakeCategory();
    expect(caregory.namespace).to.be.equal('Category');
    expect(caregory.bucket).to.be.equal('categories');
    expect(Predefine.fakeCategory(2)).to.have.length(2);

    expect(Predefine.fakeItem).to.exist;
    const item = Predefine.fakeItem();
    expect(item.namespace).to.be.equal('Item');
    expect(item.bucket).to.be.equal('items');
    expect(Predefine.fakeItem(2)).to.have.length(2);

    expect(Predefine.fakeUnit).to.exist;
    const unit = Predefine.fakeUnit();
    expect(unit.namespace).to.be.equal('Unit');
    expect(unit.bucket).to.be.equal('units');
    expect(Predefine.fakeUnit(2)).to.have.length(2);
  });

  it('should expose namespaced find', () => {
    expect(Predefine.findSetting).to.exist.and.be.a('function');
    expect(Predefine.findSetting().getFilter().namespace).to.be.eql('Setting');

    expect(Predefine.findCurrency).to.exist.and.be.a('function');
    expect(Predefine.findCurrency().getFilter().namespace).to.be.eql(
      'Currency'
    );

    expect(Predefine.findCategory).to.exist.and.be.a('function');
    expect(Predefine.findCategory().getFilter().namespace).to.be.eql(
      'Category'
    );

    expect(Predefine.findItem).to.exist.and.be.a('function');
    expect(Predefine.findItem().getFilter().namespace).to.be.eql('Item');

    expect(Predefine.findUnit).to.exist.and.be.a('function');
    expect(Predefine.findUnit().getFilter().namespace).to.be.eql('Unit');
  });
});

import { resolve as resolvePath } from 'path';
import { createWriteStream } from 'fs';
import { expect, clear, create } from '@lykmapipo/mongoose-test-helpers';
import csv2array from 'csv-to-array';
import { Predefine } from '../../src';

const csvPath = resolvePath(`${__dirname}/../fixtures/out.csv`);
const readCsv = done => csv2array({ file: csvPath, columns: true }, done);

describe('Predefine Export', () => {
  const predefine = Predefine.fake();
  predefine.set({ booleans: { default: true } });

  const assertExport = (error, records) => {
    expect(error).to.not.exist;
    expect(records).to.exist;
  };

  before(done => clear(done));

  before(done => create(predefine, done));

  it('should have exportable fields', () => {
    expect(Predefine.EXPORTABLE_FIELDS).to.exist;
    expect(Predefine.EXPORTABLE_FIELDS).to.be.an('object');
    expect(Predefine.EXPORTABLE_FIELDS).to.have.property('strings.name.en');
    expect(Predefine.EXPORTABLE_FIELDS).to.have.property('strings.name.sw');
    expect(Predefine.EXPORTABLE_FIELDS).to.have.property(
      'strings.abbreviation.en'
    );
    expect(Predefine.EXPORTABLE_FIELDS).to.have.property(
      'strings.abbreviation.sw'
    );
    expect(Predefine.EXPORTABLE_FIELDS).to.have.property(
      'strings.description.en'
    );
    expect(Predefine.EXPORTABLE_FIELDS).to.have.property(
      'strings.description.sw'
    );
    expect(Predefine.EXPORTABLE_FIELDS).to.have.property('strings.code');
    expect(Predefine.EXPORTABLE_FIELDS).to.have.property('strings.symbol');
    expect(Predefine.EXPORTABLE_FIELDS).to.have.property('strings.color');
    expect(Predefine.EXPORTABLE_FIELDS).to.have.property('numbers.weight');
    expect(Predefine.EXPORTABLE_FIELDS).to.have.property('booleans.default');
    expect(Predefine.EXPORTABLE_FIELDS).to.have.property('booleans.preset');
  });

  it('should be able to export to csv', done => {
    const out = createWriteStream(csvPath);
    const options = { sort: { updatedAt: -1 } };
    Predefine.exportCsv(options, out, (/* error */) => {
      readCsv((error, records) => {
        assertExport(error, records);
        done(error, records);
      });
    });
  });

  after(done => clear(done));
});

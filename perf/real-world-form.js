/* eslint import/no-unresolved: 0 */

const Benchmark = require('benchmark')
const baseCreateElement = require('./snnabdom-base').createElement
const newCreateElement = require('./snnabdom-new').createElement

function realWorldForm(createElement) {
  const state = {}
  const patient = { get() {} }
  const clinicalCalcs = {
    get() {},
    isEmpty() {return false},
    keys() {return ['a', 'b', 'c', 'd', 'e']}
  }
  return createElement(
    'div',
    { className: 'page compact-content' },
   createElement(
      'div',
      { className: 'navbar' },
     createElement(
        'div',
        { className: 'navbar-inner' },
       createElement(
          'div',
          { className: 'left' },
         createElement(
            'a',
            { href: '#', className: 'link icon-only back' },
           createElement('i', { className: 'icon icon-back' })
          )
        ),
       createElement(
          'div',
          { className: 'center sliding' },
          'Exames do Paciente'
        ),
       createElement('div', { className: 'right' })
      )
    ),
   createElement(
      'div',
      { className: 'page-content' },
     createElement(
        'div',
        { className: 'content-block' },
       createElement(
          'h3',
          null,
          patient.get('name'),
          ' anos',
         createElement('br', null),
         createElement(
            'span',
            { className: 'header-subtitle' },
            patient.get('sectorname') || '',
            ' Leito ',
            (patient.get('bednumber') || '').padStart(2, '0')
          )
        )
      ),
     createElement(
        'div',
        { className: 'content-block' },
       createElement(
          'div',
          { className: 'row' },
         createElement(
            'div',
            { className: 'col' },
           createElement(
              'b',
              null,
              'Registro'
            ),
           createElement('br', null),
            patient.get('registry'),
            ' ',
           createElement('br', null)
          ),
         createElement(
            'div',
            { className: 'col' },
           createElement(
              'b',
              null,
              'Admiss\xE3o Hospitalar'
            ),
           createElement('br', null),
            ' ',
           createElement('br', null)
          )
        )
      ),
     createElement(
        'div',
        { className: 'list-block' },
       createElement(
          'ul',
          null,
         createElement(
            'li',
            { id: 'clinical-calcs', className: 'accordion-item' },
           createElement(
              'a',
              { href: '#', className: 'item-content item-link' },
             createElement(
                'div',
                { className: 'item-inner' },
               createElement(
                  'div',
                  { className: 'item-title' },
                  'C\xE1lculos'
                )
              )
            ),
           createElement(
              'div',
              { className: 'content-block' },
             createElement(
                'div',
                { className: 'accordion-item-content' },
                clinicalCalcs ? createElement(
                  'div',
                  null,
                  ' ',
                 createElement(
                    'div',
                    { className: 'card-content' },
                    !clinicalCalcs.isEmpty() ? createElement(
                      'div',
                      { className: 'list-block media-list' },
                      clinicalCalcs.keys().map((calcKey) => {
                        return createElement(
                          'ul',
                          null,
                         createElement(
                            'li',
                            null,
                           createElement(
                              'a',
                              { href: '#', className: 'item-link item-content calc-item', data: { calcKey } },
                             createElement(
                                'div',
                                { className: 'item-inner' },
                               createElement(
                                  'div',
                                  { className: 'item-title-row' },
                                 createElement(
                                    'div',
                                    { className: 'item-title' },
                                    clinicalCalcs.get(calcKey)
                                  )
                                ),
                               createElement(
                                  'div',
                                  { className: 'item-text' },
                                  clinicalCalcs.get(calcKey) || ''
                                )
                              )
                            )
                          )
                        )
                      })
                    ) : 'Nenhum cálculo salvo'
                  ),
                 createElement(
                    'div',
                    { className: 'card-footer' },
                   createElement('div', null),
                    ' ',
                   createElement(
                      'a',
                      { href: '#', id: 'add-calc-item', className: 'link' },
                      'Adicionar'
                    )
                  )
                ) : createElement(
                  'div',
                  { className: 'text-center' },
                 createElement('span', { className: 'preloader' })
                )
              )
            )
          )
        )
      ),
     createElement('div', { data: state.testsTableData })
    )
  )
}

const suite = new Benchmark.Suite('real world form')

// add tests
suite.add('jsx-base', () => {
  realWorldForm(baseCreateElement)
}).
add('jsx-new', () => {
  realWorldForm(newCreateElement)
})

module.exports = suite

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function CMPUForm() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white">
        {/* Header */}
        <div className="flex justify-between items-center p-6 bg-white">
          <div className="flex items-center gap-2">
            <div className="w-4 h-6 bg-green-500"></div>
            <div className="w-4 h-6 bg-pink-500"></div>
            <div>
              <div className="text-xs text-gray-600">Eleição</div>
              <div className="text-2xl font-bold">CMPU</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-red-600 rounded-full"></div>
            </div>
            <div className="text-right">
              <div className="text-xs font-semibold">PREFEITURA DE</div>
              <div className="text-sm font-bold">SÃO PAULO</div>
            </div>
          </div>
        </div>

        {/* Edital Button */}
        <div className="px-6 pb-4">
          <Button variant="outline" className="rounded-full px-6 bg-transparent">
            Edital
          </Button>
        </div>

        {/* Type Selection */}
        <div className="px-6 pb-6">
          <div className="mb-2">
            <div className="font-semibold text-sm">Tipo de inscrição</div>
            <div className="text-xs text-gray-600">Escolha o tipo de inscrição que deseja realizar</div>
          </div>
          <div className="flex gap-4">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-2 rounded-full">Chapa</Button>
            <Button
              variant="outline"
              className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-2 rounded-full border-pink-500"
            >
              Individual
            </Button>
          </div>
        </div>

        {/* Form */}
        <div className="px-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Formulário de inscrição de candidatura</h2>
            <p className="text-sm text-gray-600">
              Preencha os campos abaixo para realizar a inscrição para uma das 22 vagas no Conselho Municipal de
              Política Urbana (CMPU)
            </p>
          </div>

          {/* Informações da chapa */}
          <div className="mb-6">
            <div className="bg-teal-700 text-white p-3 font-semibold">Informações da chapa</div>
            <div className="border border-gray-300 p-4 space-y-4">
              <div>
                <Label htmlFor="nome-chapa" className="text-sm font-medium">
                  Nome da chapa
                </Label>
                <Input id="nome-chapa" className="mt-1" />
              </div>

              <div>
                <Label htmlFor="nome-entidade" className="text-sm font-medium">
                  Nome da entidade
                </Label>
                <Input id="nome-entidade" className="mt-1" />
              </div>

              <div>
                <Label className="text-sm font-medium">Segmento</Label>
                <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="movimento-moradia" name="segmento" className="w-4 h-4" />
                      <label htmlFor="movimento-moradia">Movimento de moradia</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="entidades-academicas" name="segmento" className="w-4 h-4" />
                      <label htmlFor="entidades-academicas">Entidades acadêmicas e de pesquisa</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="movimentos-mobilidade" name="segmento" className="w-4 h-4" />
                      <label htmlFor="movimentos-mobilidade">Movimentos de Mobilidade Urbana</label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="associacoes-bairro" name="segmento" className="w-4 h-4" />
                      <label htmlFor="associacoes-bairro">Associações de bairro</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="movimento-ambientalista" name="segmento" className="w-4 h-4" />
                      <label htmlFor="movimento-ambientalista">Movimento ambientalista</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="movimento-cultural" name="segmento" className="w-4 h-4" />
                      <label htmlFor="movimento-cultural">Movimento Cultural</label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="setor-empresarial" name="segmento" className="w-4 h-4" />
                      <label htmlFor="setor-empresarial">Setor empresarial</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="ongs" name="segmento" className="w-4 h-4" />
                      <label htmlFor="ongs">ONGs</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="entidades-religiosas" name="segmento" className="w-4 h-4" />
                      <label htmlFor="entidades-religiosas">Entidades Religiosas</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Anexos */}
          <div className="mb-6">
            <div className="bg-teal-700 text-white p-3 font-semibold">
              Anexos <span className="text-sm font-normal">(Limite máximo de 250mb)</span>
            </div>
            <div className="border border-gray-300 p-4 space-y-4">
              <div>
                <Label className="text-sm font-medium">Documento da entidade</Label>
                <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Button variant="outline" size="sm">
                    Escolher arquivo
                  </Button>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Documento do candidato</Label>
                <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Button variant="outline" size="sm">
                    Escolher arquivo
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="confirmo" />
                <label htmlFor="confirmo" className="text-sm">
                  Confirmo que as informações acima são verdadeiras
                </label>
              </div>
            </div>
          </div>

          {/* Contato */}
          <div className="mb-6">
            <div className="bg-teal-700 text-white p-3 font-semibold">Contato</div>
            <div className="border border-gray-300 p-4 space-y-4">
              <div>
                <Label htmlFor="nome" className="text-sm font-medium">
                  Nome
                </Label>
                <Input id="nome" className="mt-1" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email
                  </Label>
                  <Input id="email" type="email" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="confirme-email" className="text-sm font-medium">
                    Confirme e-mail
                  </Label>
                  <Input id="confirme-email" type="email" className="mt-1" />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pb-6 flex justify-center">
            <Button className="bg-green-500 hover:bg-green-600 text-white px-12 py-3 rounded-full text-lg">
              Enviar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}